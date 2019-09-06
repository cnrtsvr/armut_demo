import KeywordCellRenderer from "./KeywordCellRenderer.js";
import NumberCellRenderer from "./NumberCellRenderer.js";
import CurrencyCellRenderer from "./CurrencyCellRenderer.js";
import PercentageCellRenderer from "./PercentageCellRenderer.js";
import CategoriesCellRenderer from "./CategoriesCellRenderer.js";

import { formatDecimal } from "./numberHelpers.js";

function getValueFromVolumeArray(index) {
  return (params) => {
    return formatDecimal(params.data.historicalVolumes[index]);
  }
}

export default [
  {
    field: 'keyword',
    headerName: 'Keyword',
    cellRenderer: KeywordCellRenderer,
    filter: true,
    suppressMenu: false,
    menuTabs: ['filterMenuTab'],
    pinned: 'left',
    minWidth: 250
  },
  {
    field: 'avgVolume',
    headerName: 'Avg. SV',
    cellRenderer: NumberCellRenderer,
    filter: true,
    suppressMenu: false,
    menuTabs: ['filterMenuTab'],
    minWidth: 100,
    maxWidth: 150
  },
  {
    field: 'cpc',
    headerName: 'CPC',
    cellRenderer: CurrencyCellRenderer,
    minWidth: 100,
    maxWidth: 150
  },
  {
    field: 'competition',
    headerName: 'Competition',
    cellRenderer: PercentageCellRenderer,
    minWidth: 100,
    maxWidth: 150
  },
  {
    field: 'categories',
    headerName: 'Categories',
    cellRenderer: CategoriesCellRenderer,
    minWidth: 100
  },
  {
    headerName: 'Aug 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(0)
  },
  {
    headerName: 'Jul 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(1)
  },
  {
    headerName: 'Jun 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(2)
  },
  {
    headerName: 'May 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(3)
  },
  {
    headerName: 'Apr 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(4)
  },
  {
    headerName: 'Mar 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(5)
  },
  {
    headerName: 'Feb 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(6)
  },
  {
    headerName: 'Jan 2019',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(7)
  },
  {
    headerName: 'Dec 2018',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(8)
  },
  {
    headerName: 'Nov 2018',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(9)
  },
  {
    headerName: 'Oct 2018',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(10)
  },
  {
    headerName: 'Sep 2018',
    minWidth: 100,
    maxWidth: 150,
    valueGetter: getValueFromVolumeArray(11)
  }
]
