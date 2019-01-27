import { Breadcrumb, BreadcrumbItem, Button, Column, Control, Field, Input, Label } from 'bloomer';
import { Columns } from 'bloomer/lib/grid/Columns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionAddCake, actionAddCakeReset } from '../../actions/add-cake';
import { Cake } from '../../models';
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

interface FormValue<T> {
  value: T;
  valid: boolean;
  touched: boolean;
}

interface FormValues {
  [name: string]: FormValue<string | number>,
  name: FormValue<string>;
  comment: FormValue<string>;
  imageUrl: FormValue<string>;
  yumFactor: FormValue<number>;
}

interface CreateState {
  controls: FormValues;
}

class Create extends Component<CreateProps, CreateState> {
  validators: any = {
    name: Validators.required,
    comment: Validators.required,
    imageUrl: Validators.startsWithProtocol
  }

  constructor(props: CreateProps) {
    super(props);

    this.state = {
      controls: {
        name: { value: '', valid: false, touched: false },
        comment: { value: '', valid: false, touched: false },
        imageUrl: { value: '', valid: false, touched: false },
        yumFactor: { value: 5, valid: true, touched: false },
      }
    };
  }

  componentDidMount() {
    this.props.reset();
  }

  createCake = async () => {
    const controls = this.state.controls;

    const cake: Cake = {
      name: controls.name.value,
      comment: controls.comment.value,
      imageUrl: controls.imageUrl.value,
      yumFactor: controls.yumFactor.value
    };

    this.props.addCake(cake);
  }

  componentWillReceiveProps(props: CreateProps) {
    if (props.succeeded) {
      this.props.history.push('/');
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let valid = true;

    if (this.validators[name]) {
      valid = this.validators[name](value);
    }

    this.setState({
      controls: { ...this.state.controls, [name]: { value, valid, touched: true } },
    } as any);
  }

  formInvalid = () => Object.keys(this.state.controls).some((key) => !this.state.controls[key].valid);

  render() {
    const { loading, error } = this.props;
    const { name, comment, imageUrl, yumFactor } = this.state.controls;

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
            <button className="delete" onClick={() => this.props.reset()}></button>
            Could not create Cake! If this continues please contact support.
          </div>) : ''
          }

          <form noValidate>
            <Field>
              <Label>Name</Label>
              <Control>
                <Input type="text" placeholder='The name of your cake' name="name" value={name.value} onChange={this.handleInputChange} />
                <div className={"validation-message" + (name.touched && !name.valid ? ' validation-message-display' : '')}><span>This field is required.</span></div>
              </Control>
            </Field>

            <Field>
              <Label>Comment</Label>
              <Control>
                <Input type="text" placeholder='What do you think of the cake?' name="comment" value={comment.value} onChange={this.handleInputChange} />
                <div className={"validation-message" + (comment.touched && !comment.valid ? ' validation-message-display' : '')}><span>This field is required.</span></div>
              </Control>
            </Field>


            <Field>
              <Label>Image Url</Label>
              <Control>
                <Input type="text" placeholder="e.g. http://www.website.com/image.png" name="imageUrl" value={imageUrl.value} onChange={this.handleInputChange} />
                <div className={"validation-message" + (imageUrl.touched && !imageUrl.valid ? ' validation-message-display' : '')}><span>This field is required and must start with a valid protocol.</span></div>
              </Control>
            </Field>

            <Field>
              <Label>Yum Factor</Label>
              <Control>
                <Input type="number" min="1" max="5" name="yumFactor" value={yumFactor.value} onChange={this.handleInputChange} />
              </Control>
            </Field>

            <Field isGrouped>
              <Control>
                <Button isLoading={loading} isColor='primary' onClick={this.createCake} disabled={this.formInvalid()} >Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);
