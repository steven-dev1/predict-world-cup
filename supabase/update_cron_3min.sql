-- Cambiar cron job a cada 3 minutos
SELECT cron.unschedule('update-scores-cron');

SELECT cron.schedule(
  'update-scores-cron',
  '*/3 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://nzrtvtjaeposhksdcfps.supabase.co/functions/v1/update-scores',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cnR2dGphZXBvc2hrc2RjZnBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQyNjQ0NSwiZXhwIjoyMDY0OTkyNDQ1fQ.dS7u1jKXXsGROz2GnXEYMHfNTxqV9hTjU93W3dC3wLk"}'::jsonb
  );
  $$
);

SELECT jobname, schedule FROM cron.job WHERE jobname = 'update-scores-cron';
