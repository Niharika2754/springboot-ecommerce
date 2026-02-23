package com.divami.workflowManagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflowManagement.entity.WorkFlowInstance;

public interface WorkflowInstanceRepo extends JpaRepository<WorkFlowInstance, Long>{
    
}
