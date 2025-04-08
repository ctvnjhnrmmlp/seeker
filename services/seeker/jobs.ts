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
        const data = await response.json();
        return data.data;
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
    try {
      const response = await fetch(`${this.endpoint}/find`, {
        method: 'POST',
        body: JSON.stringify(query),
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

  static async updateJob({
    email,
    jobId,
    updatedJobData,
  }: {
    email: string;
    jobId: string;
    updatedJobData: z.infer<typeof JobSchema>;
  }): Promise<Job | null> {
    try {
      const response = await fetch(`${this.endpoint}/update`, {
        method: 'PUT',
        body: JSON.stringify({
          id: jobId,
          data: updatedJobData,
        }),
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

  static async deleteJob({
    email,
    jobId,
  }: {
    email: string;
    jobId: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(`${this.endpoint}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ id: jobId }),
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': email,
        },
      });

      if (response.ok) {
        return true;
      }

      throw new Error();
    } catch (error) {
      return false;
    }
  }
}
