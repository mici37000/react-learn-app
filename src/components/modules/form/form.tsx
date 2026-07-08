import {
  GpButton,
  GpCheckbox,
  GpDatePicker,
  GpField,
  GpForm,
  GpFormElement,
  GpMultiSelect,
  GpNumericTextBox,
  GpSwitch,
} from "@genpact/ui";
import { useState } from "react";

const Category = (props: any) => {
  const { value, onChange } = props;

  return (
    <GpMultiSelect
      ariaLabel="Category"
      onChange={(event) => onChange?.({ value: event.target.value })}
      data={["Analytics", "OCR", "Deductions", "Disputes", "Compliance"]}
      defaultValue={["OCR"]}
      fillMode="solid"
      rounded="medium"
      size="medium"
      value={value}
    />
  );
};

function Form() {
  const [user, setUser] = useState({
    email: "",
    category: "",
  });

  function save(values): void {
    console.log("Form values:", values);
  }

  return (
    <>
      <div>
        <GpButton size="large" variant="danger">
          Genpact Button
        </GpButton>
      </div>
      <div>
        <GpCheckbox
          label="Accept terms and conditions"
          size="medium"
          checked
          disabled
        />
      </div>
      <div>
        <GpNumericTextBox
          defaultValue={30}
          placeholder="0"
          size="medium"
          spinners
        />
      </div>
      <div>
        <GpSwitch ariaLabel="Enable notifications" size="medium" />
      </div>
      <div>
        <div
          style={{
            width: 240,
          }}
        >
          <GpDatePicker
            defaultValue={new Date("2026-06-13T21:00:00.000Z")}
            fillMode="solid"
            rounded="medium"
            size="medium"
          />
        </div>
        <div>
          <GpForm
            onSubmit={(values) => save(values)}
            render={(form) => (
              <GpFormElement>
                <GpField name="email" label="Email" component={"input"} onChange={(event) => setUser({ ...user, email: event.target.value })} />
                <GpField
                  name="category"
                  label="Category"
                  component={Category}
                  onChange={(event) => setUser({ ...user, category: event.value })}
                />
                <GpButton
                  type="submit"
                  themeColor="primary"
                  disabled={!form.allowSubmit}
                >
                  Save
                </GpButton>
              </GpFormElement>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Form;
