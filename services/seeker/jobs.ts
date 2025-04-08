import { JobSchema } from '@/lib/zod';
import { Job } from '@prisma/client';
import { z } from 'zod';

export default class JobService {
  static endpoint = `${process.env.BASE_URL}/api/jobs`;

  static async createJob({
    email,
    job,
  }: {
    email: string;
    job: z.infer<typeof JobSchema>;
  }): Promise<Job | null> {
    try {
      const response = await fetch(`${this.endpoint}/create`, {
        method: 'POST',
        body: JSON.stringify(job),
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': email,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error();
    } catch (error) {
      return null;
    }
  }
}
