import React from 'react';
import { Exporter, OutputVendorName, YnabConfig } from '../../types';
import EditFileExporter from './EditFileExporter';
import EditFireflyExporter from './EditFireflyExporter';
import EditYnabExporter from './EditYnabExporter';
import EditSheetsExporter from './google-sheets/EditSheetsExporter';

type EditExporterProps = {
  handleSave: (exporterConfig: Exporter | YnabConfig) => Promise<void>;
  exporter: Exporter;
};

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
  exporterTypeToEditComponent.set(
    OutputVendorName.FIREFLY,
    <EditFireflyExporter exporter={exporter} handleSave={handleSave} />
  );
  return <>{exporterTypeToEditComponent.get(exporter.companyId)}</>;
}
