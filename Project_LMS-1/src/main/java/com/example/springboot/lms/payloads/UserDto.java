
package com.example.springboot.lms.payloads;

import java.time.LocalDate;

import com.example.springboot.lms.enums.UserTypesEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
public class UserDto {

	private int userId;
	private String password;
	private String name;
	private String emailId;
	private LocalDate DOB;
	private String  bloodGroup;
	private String gender;
	private UserTypesEnum designation;
	private String contactNo;
	private String address;
	public UserDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserDto(int userId, String password, String name, String emailId, LocalDate dOB, String bloodGroup,
			String gender, UserTypesEnum designation, String contactNo, String address) {
		super();
		this.userId = userId;
		this.password = password;
		this.name = name;
		this.emailId = emailId;
		DOB = dOB;
		this.bloodGroup = bloodGroup;
		this.gender = gender;
		this.designation = designation;
		this.contactNo = contactNo;
		this.address = address;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public LocalDate getDOB() {
		return DOB;
	}
	public void setDOB(LocalDate dOB) {
		DOB = dOB;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public UserTypesEnum getDesignation() {
		return designation;
	}
	public void setDesignation(UserTypesEnum designation) {
		this.designation = designation;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
}
