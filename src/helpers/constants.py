import enum


class Response(enum.Enum):
    SUCCESS = "Your request was processed successfully."
    LOGIN_SUCCESS = "Logged in successfully."
    NOT_EXIST = "{} does not exist."
    ALREADY_EXIST = "{} already exists."
    INCORRECT_PASSWORD = "Incorrect password, please try again!"
    ADD_SUCCESS = "{} added successfully."
    INVALID_INFORMATION = "Invalid information."
    USER_VERIFIED = "User verified."
    USER_NOT_VERIFIED = "User not verified. Please check your email."