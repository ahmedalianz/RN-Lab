import {WorkbenchScreen} from '../../../components/WorkbenchScreen';
import {categoryColors} from '../../../theme';

export function NfcLabScreen() {
  return (
    <WorkbenchScreen
      title="NFC Lab"
      domainLabel="Hardware Lab"
      accentColor={categoryColors.hardware}
      description="Tag read / write flows"
      path="src/experiments/hardware/nfc"
    />
  );
}
