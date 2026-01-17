package com.example.ecommerce.entity;

import java.io.Serializable;
import lombok.Data;

@Data
public class CommonCodeId implements Serializable {
    private String codeType;
    private String code;
}
