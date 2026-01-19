package vn.aeoc.packages.infra.jooq.config;

import javax.sql.DataSource;

import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.conf.RenderNameCase;
import org.jooq.conf.RenderQuotedNames;
import org.jooq.conf.Settings;
import org.jooq.impl.DSL;
import org.jooq.impl.DefaultConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JooqConfig {
  @Bean
  public DSLContext dslContext(DataSource dataSource) {
    Settings settings = new Settings();
    settings.setRenderQuotedNames(RenderQuotedNames.EXPLICIT_DEFAULT_QUOTED);
    settings.setRenderNameCase(RenderNameCase.LOWER);
    DefaultConfiguration configuration = new DefaultConfiguration();
    configuration.set(dataSource);
    configuration.set(SQLDialect.MYSQL);
    configuration.set(settings);
    //    configuration.set(new DefaultAnnotatedPojoMemberProvider());
    return DSL.using(configuration);
  }
}
