package com.divami.workflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflow.entity.WorkflowInstance;

public interface WorkflowInstanceRepository extends JpaRepository<WorkflowInstance, Long> {
}
