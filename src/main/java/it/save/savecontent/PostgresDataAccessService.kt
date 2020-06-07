/*
 * Copyright 2020 Vignesh
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package it.save.savecontent

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository("postgres")
open class PostgresDataAccessService @Autowired constructor(private val jdbcTemplate: JdbcTemplate) : DataAccessService {
    override fun saveContent(save: Save) {
        val sql = "INSERT INTO $TAB_SAVE_CONTENT VALUES(?, ?, ?) " +
                "ON CONFLICT ($COL_CONTENT_KEY) " +
                "DO UPDATE SET $COL_SAVED_CONTENT = ?, $COL_EXPIRY_TIME = ?;"

        with(save) {
            jdbcTemplate.update(sql, contentKey, content, expiresAt, content, expiresAt)
        }
    }

    override fun getContent(contentKey: String): Save {
        with(jdbcTemplate) {
            val result = queryForList("SELECT * FROM $TAB_SAVE_CONTENT WHERE $COL_CONTENT_KEY = ?", contentKey)

            if (result.size == 0) return Save(contentKey)

            val savedContent = Save(
                    result[0][COL_CONTENT_KEY] as String,
                    result[0][COL_SAVED_CONTENT] as String,
                    (result[0][COL_EXPIRY_TIME] as BigDecimal).longValueExact()
            )

            return if (savedContent.hasExpired()) Save(contentKey) else savedContent
        }
    }

    companion object {
        const val TAB_SAVE_CONTENT = "save_content"

        const val COL_CONTENT_KEY = "content_key"
        const val COL_SAVED_CONTENT = "saved_content"
        const val COL_EXPIRY_TIME = "expiry_time"
    }
}