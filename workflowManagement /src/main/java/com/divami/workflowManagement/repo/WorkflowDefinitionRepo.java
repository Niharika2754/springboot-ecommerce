package com.divami.workflowManagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflowManagement.entity.WorkflowDefinition;

public interface WorkflowDefinitionRepo extends JpaRepository<WorkflowDefinition, Long> {

   WorkflowDefinition findByCodeAndIsActiveTrue(String workflowCode);
    
}
