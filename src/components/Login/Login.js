import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") { return { value: action.val, isValid: action.val.includes('@') };  }
  if (action.type === "INPUT_BLUR") { return { value: state.value, isValid: state.value.includes('@') };  }
  return { value: "", isValid: false };
}
const emailReducerInitialValue = { value: "", isValid: null };

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") { return { value: action.val, isValid: action.val.trim().length > 1 };  }
  if (action.type === "INPUT_BLUR") { return { value: state.value, isValid: state.value.trim().length > 1 };  }
  return { value: "", isValid: false };
}
const passwordReducerInitialValue = { value: "", isValid: null };

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, emailReducerInitialValue)
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, passwordReducerInitialValue)

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validating");
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 1000)
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => { dispatchEmailState({ type: "INPUT_BLUR" });  };

  const validatePasswordHandler = () => { dispatchPasswordState({ type: "INPUT_BLUR" });  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input isValid={emailState.isValid} id="email" label="E-mail" type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input isValid={passwordState.isValid} id="password" label="Password" type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
