import { useState } from "react"
import { cancelAllNotifications, scheduleNotification } from "@utils/notificationManager"
import { Title } from "@components/common/Title/styles"
import { NotificationButtonContainer } from "./styles"
import { Button } from "@components/common/Button/styles"
import { constants } from "../../theme/constants"
import { Alert } from "react-native"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export const NotificationButton = () => {

  const DEFAULT_DATE = 1598051730000;
  const DEBUG = false;

  const [date, setDate] = useState(new Date(DEFAULT_DATE));
  const [firstRender, setFirstRender] = useState(true)

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setFirstRender(false)
    cancelAllNotifications()
  };

  const handleOnTrashIconClick = () => {
    Alert.alert(`🗑️ Todos os lembretes foram excluidos!`,
      `Para continuar rececebendo alertas sobre o clima voce deve configurar novamente um horário e confirma-lo para que o lembrete seja definido.`)
    cancelAllNotifications()
  }

  const handleFormatDateParams = () => {
    if (date.getMinutes().toString().length === 1) return "  " + date.getHours() + ":0" + date.getMinutes()
    return "  " + date.getHours() + ":" + date.getMinutes()
  }

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: "spinner"
    });
  };
  
  const showTimepicker = () => {
    showMode('time');
  };

  const handleShowNotification = async (title: string, body: string, hour: number, minute: number, repeat: boolean) => {
    try {

      if (DEBUG) console.log("HORA ESCOLHIDA", date.getHours(), ":", date.getMinutes())

      const identifier = await scheduleNotification(title, body, hour, minute, repeat);
      if (DEBUG)console.log('Notificação agendada com o ID:', identifier);
      Alert.alert(`🔔 Lembrete de tempo realizado`,
        `A notificação de lembrete de tempo foi agendado diariamente às ${handleFormatDateParams()}.`)
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  return (
    <NotificationButtonContainer>
      <Button
        color={constants.COLORS.TRANSPARENT}
        onPress={showTimepicker}>

        <Title
          fontStyle="REGULAR"
          fontSize="20px"
          color={constants.COLORS.MAIN_YELLOW}
        >
          <Ionicons name="notifications" size={30} color={constants.COLORS.MAIN_YELLOW} />
          {!firstRender ? ` ${handleFormatDateParams()}  ` : "  Definir horário "}
          <Ionicons onPress={handleOnTrashIconClick} name="trash" size={30} color={constants.COLORS.WHITE} />

        </Title>
      </Button>

      <Button
        color={constants.COLORS.GREEN_CONFIRM}
        onPress={() => {
          handleShowNotification("Previsão do tempo de hoje! 🌤️🌤️🌤️", "Clique e confira a previsão do tempo para hoje", date.getHours(), date.getMinutes(), true)
        }
        }>
        <Title
          fontStyle="REGULAR"
          fontSize="25px"
          color={constants.COLORS.WHITE}
        >
        <AntDesign name="checkcircleo" size={24} color={constants.COLORS.WHITE}/>

          {"  Agendar lembrete"}
        </Title>

      </Button>
    </NotificationButtonContainer>

  )

}
