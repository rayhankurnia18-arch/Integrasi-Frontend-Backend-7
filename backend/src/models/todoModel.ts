import pool from '../config/db';

export const TodoModel = {
  getByUserId: async (userId: number, limit: number, offset: number) => {
    const [rows] = await pool.query(
      'SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );
    return rows;
  },

  countByUserId: async (userId: number) => {
    const [rows]: any = await pool.query(
      'SELECT COUNT(*) AS total FROM todos WHERE user_id = ?',
      [userId]
    );
    return rows[0].total as number;
  },

  getById: async (id: number, userId: number) => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  },

  create: async (userId: number, task: string) => {
    const [result]: any = await pool.query(
      'INSERT INTO todos (user_id, task, is_completed) VALUES (?, ?, false)',
      [userId, task]
    );
    return result.insertId;
  },

  // Bagian ini diubah sesuai instruksi Bagian A pada modul
  update: async (id: number, task: string | undefined, isCompleted: boolean | undefined, userId: number) => {
    const fields: string[] = [];
    const values: any[] = [];
    
    if (task !== undefined) {
        fields.push('task = ?');
        values.push(task);
    }
    if (isCompleted !== undefined) {
        fields.push('is_completed = ?');
        values.push(isCompleted);
    }
    
    if (fields.length === 0) return 0;
    
    values.push(id, userId);
    
    const [result]: any = await pool.query(
        `UPDATE todos SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
        values
    );
    
    return result.affectedRows;
  }
};