import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const CampaignsForm = () => (
  <Form>
    <Form.Field>
      <label>Campaign Name</label>
      <input placeholder="Campaign Name" />
    </Form.Field>
    <Form.Field>
      <Form>
        <Form.Field>
          <label>Customers</label>
        </Form.Field>
      </Form>
    </Form.Field>
    <Form.Field>
      <Form>
        <Form.Field>
          <label>Actions</label>
        </Form.Field>
      </Form>
    </Form.Field>
    <Form.Field>
      <Checkbox label="I agree to the Terms and Conditions" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default CampaignsForm;
