package it.save.database

import com.zaxxer.hikari.HikariDataSource
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
open class PostgresDatabase {
    @Bean
    @ConfigurationProperties("app.datasource")
    open fun dataSource(): HikariDataSource {
        return DataSourceBuilder
                .create()
                .type(HikariDataSource::class.java)
                .build()
    }
}