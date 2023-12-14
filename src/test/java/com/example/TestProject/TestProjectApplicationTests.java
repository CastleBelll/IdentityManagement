package com.example.TestProject;

import com.example.TestProject.common.Common;
import com.example.TestProject.dto.SystemDto;
import com.example.TestProject.dto.UserRequestDto;
import com.example.TestProject.entity.SystemDB;
import com.example.TestProject.entity.User;
import com.example.TestProject.service.SystemDBService;
import com.example.TestProject.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
class TestProjectApplicationTests {
	@Autowired
	SystemDBService systemDBService;
	@Autowired
	UserService userService;
	@Test
	void contextLoads() {
	}
	@Test
	void testUserSave(){
	Common common = new Common();
		LocalDateTime currentDateTime = LocalDateTime.now();
		UserRequestDto dto = new UserRequestDto();
		dto.setUserId("Hello");
		dto.setUserPassword("1234");
		dto.setUserName("test_user");
		dto.setCreateDate(common.DateToString(currentDateTime));

		userService.save(dto);
	}
}
