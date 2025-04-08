import { JobSchema } from '@/lib/zod';
import { Job } from '@prisma/client';
import { z } from 'zod';

export default class JobService {
  static endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`;

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
          'x-user-email': email,
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

  static async readJobs(): Promise<Job[]> {
    try {
      const response = await fetch(`${this.endpoint}/all`);

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }

      throw new Error();
    } catch (error) {
      return [];
    }
  }
}
