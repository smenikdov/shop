import logger from '@/lib/logger';

export async function handleError(error: unknown): Promise<void> {
    logger.error('Error message from the centralized error-handling component', error);
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
}
