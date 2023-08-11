import { PropsWithChildren } from "react";
import { HeaderContainer } from "./styles";
import { Title } from "@components/common/Title/styles";
import { constants } from "../../theme/constants";

export const Header = ({ children }: PropsWithChildren, ...rest: any[]) => {
  return <HeaderContainer>
    <Title fontStyle="REGULAR" color={constants.COLORS.WHITE}>
      Clima<Title fontStyle="REGULAR" color={constants.COLORS.MAIN_YELLOW}>GO</Title>
    </Title>
    {children}
  </HeaderContainer>;
}
