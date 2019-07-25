library(bigrquery)
library(dplyr)

# Transformação 
#
# create table `hackathon_20190724.auditoria_aplicacao_data_groupby_data_cpf`  as
# select  data_evento,
# cpf,
# count(1) as qtd_registro_yyyymmddhhmmss,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(HOUR FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(MINUTE FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmddhhmm,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(HOUR FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmddhh,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmdd,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(WEEK FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyyww,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymm
# 
# from `hackathon_20190724.auditoria_aplicacao` 
# group by data_evento, cpf


sql=" select *
      from hackathon_20190724.auditoria_aplicacao_data_groupby_data_cpf"
bq_auth(path='abf9ed40b7e1.json')
df_data=query_exec(sql, 'hackathon-serpro-2019', useLegacySql = FALSE, max_pages = Inf)

set.seed(50)
modelo=kmeans(df_data[,3:8],5)

saveRDS(df_data, file="df_data_aplicacao.rds")
saveRDS(modelo, file = "modelo_aplicacao.rds")


# Transformação 
#
# create table `hackathon_20190724.auditoria_data_groupby_data_cpf`  as
# select  data_evento,
# cpf,
# count(1) as qtd_registro_yyyymmddhhmmss,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(HOUR FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(MINUTE FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmddhhmm,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(HOUR FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmddhh,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0'),
#                                     LPAD(CAST(EXTRACT(DAY FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymmdd,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(WEEK FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyyww,
# count(1) OVER (PARTITION BY CONCAT( CAST(EXTRACT(YEAR FROM data_evento) AS STRING),
#                                     LPAD(CAST(EXTRACT(MONTH FROM data_evento) AS STRING),2,'0')), cpf) as qtd_registro_yyyymm
# 
# from `hackathon_20190724.auditoria` 
# group by data_evento, cpf



sql=" select *
from hackathon_20190724.auditoria_data_groupby_data_cpf"
bigrquery::bq_auth(path='abf9ed40b7e1.json')
df_data=query_exec(sql, 'hackathon-serpro-2019', useLegacySql = FALSE, max_pages = Inf)

set.seed(50)
modelo=kmeans(df_data[,3:8],5)

saveRDS(df_data, file="df_data_auditoria.rds")
saveRDS(modelo, file = "modelo_auditoria.rds")