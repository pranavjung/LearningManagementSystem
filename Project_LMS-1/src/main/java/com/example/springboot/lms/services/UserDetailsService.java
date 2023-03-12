package com.example.springboot.lms.services;

import com.example.springboot.lms.model.User;
import com.example.springboot.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    UserRepository userDAO;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userDAO.findByEmailId(email);
        if (user.isPresent()) {
            User _user = user.get();
            return new org.springframework.security.core.userdetails.User(_user.getEmailId(), _user.getPassword(),
                    new ArrayList<>());
        }
        return null;
    }
}