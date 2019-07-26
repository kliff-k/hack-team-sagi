library(ggplot2)

modelo=readRDS(file='modelo_aplicacao.rds')
df=readRDS(file='df_data_aplicacao.rds')

cluster=modelo$cluster
df=cbind(df, cluster)

table(cluster)

ggplot(df, aes(x = jitter(qtd_registro_yyyymmdd,500), y=jitter(qtd_registro_yyyymm,500))) +
  geom_point(aes(color = factor(cluster))) +
  xlab('Qtd. Acessos por Dia') + ylab('Qtd. Acessos por Mês') + ggtitle('Base Auditoria Aplicação')+ theme(legend.position="none")



modelo=readRDS(file='modelo_auditoria.rds')
df=readRDS(file='df_data_auditoria.rds')

cluster=modelo$cluster
df=cbind(df, cluster)

table(cluster)

ggplot(df, aes(x = jitter(qtd_registro_yyyymmdd,500), y=jitter(qtd_registro_yyyymm,500))) +
  geom_point(aes(color = factor(cluster))) +
  xlab('Qtd. Acessos por Dia') + ylab('Qtd. Acessos por Mês') + ggtitle('Base Auditoria Aplicação')+ theme(legend.position="none")
