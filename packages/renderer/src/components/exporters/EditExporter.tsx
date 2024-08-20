import React from 'react';
import { type Exporter, OutputVendorName, type YnabConfig } from '../../types';
import EditFileExporter from './EditFileExporter';
import EditSheetsExporter from './google-sheets/EditSheetsExporter';
import EditYnabExporter from './EditYnabExporter';

interface EditExporterProps {
  handleSave: (exporterConfig: Exporter | YnabConfig) => Promise<void>;
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
    <EditYnabExporter exporterConfig={exporter} handleSave={handleSave} />,
  );
  exporterTypeToEditComponent.set(
    OutputVendorName.GOOGLE_SHEETS,
    <EditSheetsExporter exporterConfig={exporter} handleSave={handleSave} />,
  );
  return <>{exporterTypeToEditComponent.get(exporter.companyId)}</>;
}
