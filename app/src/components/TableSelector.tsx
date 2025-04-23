import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

type Props = {
  mesasDisponibles: number[];
  onMesaSelect: (mesa: number) => void;
};

const TableSelector = ({ mesasDisponibles, onMesaSelect }: Props) => {
  return (
    <IonItem>
      <IonLabel position="stacked">Mesa</IonLabel>
      <IonSelect placeholder="Seleccione una mesa" onIonChange={(e) => onMesaSelect(parseInt(e.detail.value))}>
        {mesasDisponibles.map((mesa) => (
          <IonSelectOption key={mesa} value={mesa}>
            Mesa {mesa}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default TableSelector;
