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
      const response = await fetch(`${this.endpoint}/read`);

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }

      throw new Error();
    } catch (error) {
      return [];
    }
  }

  static async findJobById({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): Promise<Job | null> {
    try {
      const response = await fetch(`${this.endpoint}/find/id`, {
        method: 'POST',
        body: JSON.stringify(id),
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

  static async findJobsByQuery({
    email,
    query,
  }: {
    email: string;
    query: Record<string, string>;
  }): Promise<Job[]> {
    const params = new URLSearchParams(query).toString();

    try {
      const response = await fetch(`${this.endpoint}/find`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': email,
        },
      });

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
