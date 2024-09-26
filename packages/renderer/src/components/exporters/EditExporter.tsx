import { OutputVendorName, type Exporter, type YnabConfig, type GoogleSheetsConfig } from '../../types';
import EditFileExporter from './EditFileExporter';
import EditYnabExporter from './EditYnabExporter';
import EditSheetsExporter from './google-sheets/EditSheetsExporter';

interface EditExporterProps {
  handleSave: (exporterConfig: Exporter | YnabConfig | GoogleSheetsConfig) => Promise<void>;
  exporter: Exporter;
}

export default function EditExporter({
  handleSave,
  exporter,
}: EditExporterProps) {
  const exporterTypeToEditComponent = new Map<string, JSX.Element>();
  exporterTypeToEditComponent.set(
    OutputVendorName.CSV,
    <EditFileExporter exporter={exporter} handleSave={handleSave} />,
  );
  exporterTypeToEditComponent.set(
    OutputVendorName.JSON,
    <EditFileExporter exporter={exporter} handleSave={handleSave} />,
  );
  exporterTypeToEditComponent.set(
    OutputVendorName.YNAB,
    <EditYnabExporter exporterConfig={exporter as YnabConfig} handleSave={handleSave} />,
  );
  exporterTypeToEditComponent.set(
    OutputVendorName.GOOGLE_SHEETS,
    <EditSheetsExporter exporterConfig={exporter as GoogleSheetsConfig} handleSave={handleSave} />,
  );
  return <>{exporterTypeToEditComponent.get(exporter.companyId)}</>;
}
