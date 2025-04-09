import { Application } from '@prisma/client';

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
  }): Promise<Application | null> {
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
  }): Promise<Application | null> {
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
        return await response.json();
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
  }): Promise<Application[]> {
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
        return await response.json();
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
  }): Promise<Application | null> {
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
