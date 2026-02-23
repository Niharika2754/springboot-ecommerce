package com.divami.workflowManagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflowManagement.entity.WorkflowTask;
public interface WorkflowTaskRepo extends JpaRepository<WorkflowTask, Long>{
    
}
