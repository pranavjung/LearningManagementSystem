package com.example.springboot.lms.controller;

import com.example.springboot.lms.enums.UserTypesEnum;
import com.example.springboot.lms.model.User;
import com.example.springboot.lms.payloads.BasicDTO;
import com.example.springboot.lms.payloads.LoginReqDTO;
import com.example.springboot.lms.payloads.LoginResponseDTO;
import com.example.springboot.lms.payloads.UserDto;
import com.example.springboot.lms.repository.UserRepository;
import com.example.springboot.lms.services.StudentService;
import com.example.springboot.lms.services.UserDetailsService;
import com.example.springboot.lms.services.UserService;
import com.example.springboot.lms.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UserRepository userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private StudentService studentService;

    @PostMapping("/login")
    public ResponseEntity<BasicDTO<LoginResponseDTO>> login(@RequestBody LoginReqDTO loginRequestDTO) {
        BasicDTO<LoginResponseDTO> result = this.loginHelper(
                loginRequestDTO.getEmail(),
                loginRequestDTO.getPassword());
        if (result.getData().getUser().getDesignation().equals(UserTypesEnum.STUDENT))
            result.getData().setStudent(studentService.getStudentByUserId(result.getData().getUser().getUserId()));
        return new ResponseEntity<>(result, result.isSuccess()  ? HttpStatus.OK : HttpStatus.UNAUTHORIZED );
    }
    @PostMapping("/register")
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto){
        UserDto saveUserDto =this.userService.saveUser(userDto);
        return new ResponseEntity<>(saveUserDto,HttpStatus.CREATED);
    }

    public BasicDTO<LoginResponseDTO> loginHelper(String email, String password) {
        BasicDTO<LoginResponseDTO> basicResponseDTO = new BasicDTO<>();
        Optional<User> _user = userDAO.findByEmailId(email);
        if (_user.isEmpty()) {
            basicResponseDTO.setMessage("User not found");
            return basicResponseDTO;
        }
        User user = _user.get();


        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            password));
        } catch (BadCredentialsException e) {
            basicResponseDTO.setMessage("Credentials not matched");
            return basicResponseDTO;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmailId());
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setToken(jwtUtil.generateToken(userDetails));
        loginResponseDTO.setUser(user);
        basicResponseDTO.setData(loginResponseDTO);
        basicResponseDTO.setSuccess(true);
        return basicResponseDTO;
    }

}
