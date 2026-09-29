import { AuditRecord } from '../../types';
import { sha256 } from '../../utils/crypto';

class AuditLedger {
  private chain: AuditRecord[] = [];

  async logAction(action: string, actorId: string, resourceType: string, resourceId: string, details: Record<string, any>): Promise<AuditRecord> {
    const previousHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '0'.repeat(64);
    const timestamp = new Date().toISOString();
    
    const id = crypto.randomUUID();
    const dataString = JSON.stringify({ id, timestamp, action, actorId, resourceType, resourceId, details, previousHash });
    const hash = await sha256(dataString);
    
    const record: AuditRecord = {
      id,
      timestamp,
      action,
      actorId,
      resourceType,
      resourceId,
      details,
      previousHash,
      hash
    };
    
    this.chain.push(record);
    return record;
  }

  getHistory(): AuditRecord[] {
    return [...this.chain];
  }
  
  async verifyIntegrity(): Promise<boolean> {
    for (let i = 0; i < this.chain.length; i++) {
      const record = this.chain[i];
      const dataString = JSON.stringify({
        id: record.id,
        timestamp: record.timestamp,
        action: record.action,
        actorId: record.actorId,
        resourceType: record.resourceType,
        resourceId: record.resourceId,
        details: record.details,
        previousHash: record.previousHash
      });
      const calculatedHash = await sha256(dataString);
      if (calculatedHash !== record.hash) return false;
      
      if (i > 0 && record.previousHash !== this.chain[i-1].hash) return false;
    }
    return true;
  }
}

export const auditLedger = new AuditLedger();
