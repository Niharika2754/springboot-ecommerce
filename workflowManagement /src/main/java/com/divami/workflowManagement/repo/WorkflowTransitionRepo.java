
package com.divami.workflowManagement.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflowManagement.entity.WorkflowStep;
import com.divami.workflowManagement.entity.WorkflowTransition;
public interface WorkflowTransitionRepo extends JpaRepository<WorkflowTransition, Long>{


    List<WorkflowTransition> findByFromStep(WorkflowStep fromStep);
    
}
