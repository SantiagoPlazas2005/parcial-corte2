import React from 'react';
import { IonItem, IonLabel, IonDatetime } from '@ionic/react';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange }) => {
  return (
    <IonItem>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonDatetime
        value={value}
        onIonChange={e => {
          const selectedValue = e.detail.value;
          if (typeof selectedValue === 'string') {
            onChange(selectedValue);
          }
        }}
        presentation="date-time"
      />
    </IonItem>
  );
};

export default DateTimePicker;

