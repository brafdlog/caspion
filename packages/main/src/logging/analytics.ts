import Analytics from 'analytics-node';
import { machineId } from 'node-machine-id';
import { type BudgetTrackingEventEmitter} from '@/backend/eventEmitters/EventEmitter';
import { EventNames } from '@/backend/eventEmitters/EventEmitter';

const analytics = import.meta.env.SEGMENT_WRITE_KEY ? new Analytics(import.meta.env.SEGMENT_WRITE_KEY) : null;

type EventProperties = Record<string, string | number | boolean | undefined>;

const EVENTS_TO_TRACK: EventNames[] = [
  EventNames.IMPORT_PROCESS_START,
  EventNames.IMPORTER_START,
  EventNames.IMPORTER_ERROR,
  EventNames.IMPORTER_END,
  EventNames.IMPORT_PROCESS_END,
  EventNames.EXPORT_PROCESS_START,
  EventNames.EXPORTER_START,
  EventNames.EXPORTER_ERROR,
  EventNames.EXPORTER_END,
  EventNames.EXPORT_PROCESS_END,
  EventNames.GENERAL_ERROR,
];

export async function trackPage(pageName: string, properties?: EventProperties) {
  const event = await buildEvent(properties);
  analytics?.page({
    name: pageName,
    ...event,
  });
}

export async function trackEvent(eventType: string, properties?: EventProperties) {
  const event = await buildEvent(properties);
  analytics?.track({
    ...event,
    event: eventType,
  });
}

export async function initAnalyticsEventHandling(eventEmitter: BudgetTrackingEventEmitter) {
  eventEmitter.onAny(((eventName, eventData) => {
    if (EVENTS_TO_TRACK.includes(eventName)) {
      trackEvent(eventName.toString(), {
        name: eventData?.vendorId,
        accountType: eventData?.accountType,
        isError: !!eventData?.error,
      });
    }
  }));
}

async function buildEvent(properties?: EventProperties) {
  const id = await getMachineId();
  return {
    anonymousId: id,
    properties: {
      env: process.env.NODE_ENV,
      ...properties,
    },
  };
}

let machineIdCached: string | undefined;

async function getMachineId() {
  if (machineIdCached) {
    return machineIdCached;
  }
  machineIdCached = await machineId();
  return machineIdCached;
}
