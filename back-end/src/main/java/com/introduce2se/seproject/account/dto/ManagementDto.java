package com.introduce2se.seproject.account.dto;

import com.introduce2se.seproject.account.model.Management;
import com.introduce2se.seproject.account.model.User;
import lombok.Data;

@Data
public class ManagementDto {
    private Management management;
    private User opponent;
}
