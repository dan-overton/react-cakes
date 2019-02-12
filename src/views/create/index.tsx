import { Breadcrumb, BreadcrumbItem, Button, Column, Control, Field } from 'bloomer';
import { Columns } from 'bloomer/lib/grid/Columns';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionAddCake, actionAddCakeReset } from '../../actions/add-cake';
import NumberFormControl from '../../components/form-control/number-form-control';
import TextFormControl from '../../components/form-control/text-form-control';
import { Cake, FormValue } from '../../models';
import { CakesAppState } from '../../reducers';
import * as Validators from '../../validators/validators';
import './create.scss';

interface CreateProps {
  history: any[],
  succeeded: boolean;
  loading: boolean;
  error?: Error;
  addCake: (cake: Cake) => (cake: Cake) => void;
  reset: () => () => void
}

interface FormValues {
  [name: string]: FormValue<string | number>,
  name: FormValue<string>;
  comment: FormValue<string>;
  imageUrl: FormValue<string>;
  yumFactor: FormValue<number>;
}

const Create2: React.FunctionComponent<CreateProps> = (props: CreateProps) => {
  const validators: any = {
    name: Validators.required,
    comment: Validators.required,
    imageUrl: Validators.startsWithProtocol,
    yumFactor: Validators.between(1, 5)
  }

  const [controls, setControls]: any = useState({
    name: { value: '', valid: false, touched: false },
    comment: { value: '', valid: false, touched: false },
    imageUrl: { value: '', valid: false, touched: false },
    yumFactor: { value: 5, valid: true, touched: false },
  });

  useEffect(() => {
    props.reset();
  }, []);

  useEffect(() => {
    if (props.succeeded) {
      props.history.push('/');
    }
  }, [props.succeeded])

  const createCake = async () => {
    const cake: Cake = {
      name: controls.name.value,
      comment: controls.comment.value,
      imageUrl: controls.imageUrl.value,
      yumFactor: controls.yumFactor.value
    };

    props.addCake(cake);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let valid = true;

    if (validators[name]) {
      valid = validators[name](value);
    }

    setControls({...controls, [name]: { value, valid, touched: true }});
  }

  const formInvalid = () => Object.keys(controls).some((key) => !controls[key].valid);

  const { loading, error } = props;
  const { name, comment, imageUrl, yumFactor } = controls;

  return (
    <Columns className="create-form">
      <Column isSize={{ mobile: 12, tablet: 6}}>
        <Breadcrumb>
          <ul>
            <BreadcrumbItem><Link to="/">Cakes</Link></BreadcrumbItem>
            <BreadcrumbItem>&nbsp;Create Cake</BreadcrumbItem>
          </ul>
        </Breadcrumb>
        {error ? (<div className="notification is-danger">
          <button className="delete" onClick={() => props.reset()}></button>
          Could not create Cake! If this continues please contact support.
        </div>) : ''
        }

        <form noValidate>
          <TextFormControl 
            label="Name" 
            placeholder="The name of your cake"
            validationMessage="This field is required."
            name="name" 
            value={name} 
            onChange={handleInputChange}></TextFormControl>

          <TextFormControl 
            label="Comment" 
            placeholder="What do you think of the cake?"
            validationMessage="This field is required."
            name="comment" 
            value={comment} 
            onChange={handleInputChange}></TextFormControl>

          <TextFormControl 
            label="Image Url" 
            placeholder="e.g. http://www.website.com/image.png"
            validationMessage="This field is required and must start with a valid protocol."
            name="imageUrl" 
            value={imageUrl} 
            onChange={handleInputChange}></TextFormControl>

            <NumberFormControl
              label="Yum Factor"
              name="yumFactor"
              min={1}
              max={5}
              value={yumFactor}
              onChange={handleInputChange}
              validationMessage="Please enter a number between 1 and 5."
            ></NumberFormControl>

          <Field isGrouped>
            <Control>
              <Button isLoading={loading} isColor='primary' onClick={createCake} disabled={formInvalid()} >Submit</Button>
            </Control>
            <Control>
              <Link to="/">
                <Button isLink>Cancel</Button>
              </Link>
            </Control>
          </Field>
        </form>
      </Column>
    </Columns>
  );
}

const mapStateToProps = (state: CakesAppState, compProps: CreateProps) => {
  return {
    loading: state.add.loading,
    error: state.add.error,
    succeeded: state.add.succeeded
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCake: (cake: Cake) => dispatch(actionAddCake(cake)),
    reset: () => dispatch(actionAddCakeReset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create2);
