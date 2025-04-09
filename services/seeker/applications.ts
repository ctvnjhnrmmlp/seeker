import { Application, Job, User } from '@prisma/client';

interface ApplicationIncluded extends Application {
  job: Job;
  user: User;
}

export default class ApplicationService {
  static endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/applications`;

  static async createApplication({
    email,
    userId,
    jobId,
  }: {
    email: string;
    userId: string;
    jobId: string;
  }): Promise<ApplicationIncluded | null> {
    try {
      const response = await fetch(`${this.endpoint}/create`, {
        method: 'POST',
        body: JSON.stringify({ userId, jobId }),
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

  static async findApplicationById({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): Promise<ApplicationIncluded | null> {
    try {
      const response = await fetch(`${this.endpoint}/find/id`, {
        method: 'POST',
        body: JSON.stringify({ id }),
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

  static async findApplicationsByQuery({
    email,
    query,
  }: {
    email: string;
    query: Record<string, string>;
  }): Promise<ApplicationIncluded[]> {
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

  static async deleteApplication({
    email,
    id,
  }: {
    email: string;
    id: string;
  }): Promise<ApplicationIncluded | null> {
    try {
      const response = await fetch(`${this.endpoint}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
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
}
