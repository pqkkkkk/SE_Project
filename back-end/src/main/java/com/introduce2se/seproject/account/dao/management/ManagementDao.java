package com.introduce2se.seproject.account.dao.management;

import com.introduce2se.seproject.account.dto.ManagementDto;
import com.introduce2se.seproject.account.model.User;

import java.util.List;

public interface ManagementDao {
    public List<ManagementDto> getConnectingUsers(int currentUserId, String currentRole);

}
