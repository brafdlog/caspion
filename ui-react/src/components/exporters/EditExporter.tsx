import React from 'react';
import { Exporter, OutputVendorName} from '../../types';
import EditFileExporter from "./EditFileExporter";

type EditExporterProps = {
    handleSave: (exporter: Exporter) => Promise<void>;
    exporter: Exporter;
}

export default function EditExporter({
  handleSave,
  exporter
}: EditExporterProps) {
    const exporterTypeToEditComponent = new Map<string, JSX.Element>();
    exporterTypeToEditComponent.set(OutputVendorName.CSV, <EditFileExporter exporter={exporter} handleSave={handleSave}/>);
    exporterTypeToEditComponent.set(OutputVendorName.JSON, <EditFileExporter exporter={exporter} handleSave={handleSave}/>);
  return (
      <>
          {exporterTypeToEditComponent.get(exporter.companyId)}
      </>
  );
}
