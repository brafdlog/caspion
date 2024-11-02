import { OutputVendorName } from '../types';
import csv from './exporters/excel.png';
import json from './exporters/json.jpeg';
import googleSheets from './exporters/sheets.png';
import ynab from './exporters/ynab.jpeg';
import amex from './importers/americanExpress.jpeg';
import behatsdaa from './importers/behatsdaa.png';
import beinleumi from './importers/beinleumi.jpeg';
import beyahadBishvilha from './importers/beyahadLogo.png';
import discount from './importers/discount.jpeg';
import hapoalimBeOnline from './importers/hapoalimBeOnline.jpeg';
import union from './importers/igud.jpeg';
import isracard from './importers/isracard.jpeg';
import leumi from './importers/leumi.png';
import leumiCard from './importers/leumicard.png';
import massad from './importers/massad.png';
import max from './importers/max.jpg';
import mercantile from './importers/mercantile.png';
import mizrahi from './importers/mizrahi.png';
import otsarHahayal from './importers/otsarHahayal.jpeg';
import hapoalim from './importers/poalim.jpeg';
import visaCal from './importers/visa-cal.jpeg';
import yahav from './importers/yahavLogo.jpg';
import oneZero from './importers/oneZero.jpeg';

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
  oneZero,
};

export const exporterIcons = {
  [OutputVendorName.CSV]: csv,
  [OutputVendorName.YNAB]: ynab,
  [OutputVendorName.JSON]: json,
  [OutputVendorName.GOOGLE_SHEETS]: googleSheets,
};
