---
title: "Migrating analytical systems from on-prem to cloud"
date: "2026-07-15"
tags: ["Data Engineering", "GCP", "Migration"]
---

Moving enterprise data warehouses and ETL pipelines from on-prem bare metal to the cloud is one of the highest-impact projects a data team can take on. It's also one of the riskiest.

## The typical starting point

- **Airflow** orchestrating nightly batch jobs
- **Hadoop/Spark** running on a fixed-size cluster
- **Custom ETL scripts** nobody fully understands
- **A data warehouse** that's 3 versions behind
- **No CI/CD** for data pipelines

## The target state

Think **BigQuery** for the warehouse, **Dataflow** for streaming and batch, **Cloud Composer** for orchestration, **dbt** for transformations, and **Terraform** for everything-as-code.

The hardest part isn't the tech — it's the cultural shift from "we own the hardware" to "we trust the platform."
