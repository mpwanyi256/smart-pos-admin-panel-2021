import { ExportToCsv } from 'export-to-csv';

export default {
  name: 'ExcelExportMixin',
  data() {
    return {
      options: {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: false,
        title: 'My Awesome CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      },
    };
  },
  methods: {
    exportDataToExcel(dataToexport, fileName) {
      this.options.title = fileName;
      const csvExporter = new ExportToCsv(this.options);
      csvExporter.generateCsv(dataToexport);
    },
  },
};
