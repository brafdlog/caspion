import React from 'react';
import { Exporter, OutputVendorName, YnabConfig } from '../../types';
import EditFileExporter from './EditFileExporter';
import EditYnabExporter from './EditYnabExporter';

type EditExporterProps = {
    handleSave: (exporterConfig: Exporter | YnabConfig) => Promise<void>;
    exporter: Exporter;
}

export default function EditExporter({
  handleSave,
  exporter
}: EditExporterProps) {
    const exporterTypeToEditComponent = new Map<string, JSX.Element>();
    exporterTypeToEditComponent.set(OutputVendorName.CSV, <EditFileExporter exporter={exporter} handleSave={handleSave}/>);
    exporterTypeToEditComponent.set(OutputVendorName.JSON, <EditFileExporter exporter={exporter} handleSave={handleSave}/>);
    exporterTypeToEditComponent.set(OutputVendorName.YNAB, <EditYnabExporter exporterConfig={exporter} handleSave={handleSave} />);
  return (
      <>
          {exporterTypeToEditComponent.get(exporter.companyId)}
      </>
  );
}
