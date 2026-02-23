package com.divami.workflow.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "workflow_definition")
public class WorkflowDefinition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String code;

    @OneToMany(mappedBy = "workflowDefinition", cascade = CascadeType.ALL)
    private List<WorkflowStep> steps;

    public WorkflowDefinition() {}

    public WorkflowDefinition(String name, String code) {
        this.name = name;
        this.code = code;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getName() { return name; }

    public String getCode() { return code; }

    public void setName(String name) { this.name = name; }

    public void setCode(String code) { this.code = code; }
}