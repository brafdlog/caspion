import { OutputVendorName } from '../types';
import discount from './importers/discount.jpeg';
import visaCal from './importers/visa-cal.jpeg';
import csv from './exporters/excel.png';
import ynab from './exporters/ynab.jpeg';
import googleSheets from './exporters/sheets.png';
import json from './exporters/json.jpeg';
import hapoalim from './importers/poalim.jpeg';
import hapoalimBeOnline from './importers/hapoalimBeOnline.jpeg';
import beinleumi from './importers/beinleumi.jpeg';
import union from './importers/igud.jpeg';
import amex from './importers/americanExpress.jpeg';
import isracard from './importers/isracard.jpeg';
import max from './importers/max.jpg';
import leumiCard from './importers/leumicard.png';
import otsarHahayal from './importers/otsarHahayal.jpeg';
import mizrahi from './importers/mizrahi.png';
import leumi from './importers/leumi.png';
import massad from './importers/massad.png';
import yahav from './importers/yahavLogo.jpg';
import beyahadBishvilha from './importers/beyahadLogo.png';
import behatsdaa from './importers/behatsdaa.png';
import mercantile from './importers/mercantile.png';

export const importerIcons = {
  discount,
  visaCal,
  hapoalim,
  hapoalimBeOnline,
  beinleumi,
  union,
  amex,
  isracard,
  max,
  leumiCard,
  otsarHahayal,
  mizrahi,
  leumi,
  massad,
  yahav,
  beyahadBishvilha,
  behatsdaa,
  mercantile,
};

export const exporterIcons = {
  [OutputVendorName.CSV]: csv,
  [OutputVendorName.YNAB]: ynab,
  [OutputVendorName.JSON]: json,
  [OutputVendorName.GOOGLE_SHEETS]: googleSheets,
};
