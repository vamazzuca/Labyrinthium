﻿namespace server.Dto
{
    public class SignUpRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
