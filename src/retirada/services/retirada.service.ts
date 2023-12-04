export class Retirada {
  static async getPaises(): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        {
          label: 'argentina-radix',
          value: 'arg'
        },
        {
          label: 'brasil-radix',
          value: 'br'
        },
        {
          label: 'paraguai-radix',
          value: 'prg'
        }
      ])
    }, 2000));
  }

  static async getAgencias(code: string): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        {
          label: `agencia 1-${code}`,
          value: 'a1'
        },
        {
          label: `agencia 2-${code}`,
          value: 'a2'
        },
        {
          label: `agencia 3-${code}`,
          value: 'a3'
        },
        {
          label: `agencia 4-${code}`,
          value: 'a4'
        }
      ])
    }, 2000));
  }

  static async getHorariosAgencia(codigoAgencia: string, data: string): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        {
          label: `00:00-${codigoAgencia}-${data}`,
          value: '00:00'
        },
        {
          label: `10:00-${codigoAgencia}-${data}`,
          value: '10:00'
        }
      ])
    }, 2000));
  }
  
  static async getLinhasAereas(codigoPais: string): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        {
          label: `linha01-${codigoPais}`,
          value: `l01`
        },
        {
          label: `linha02-${codigoPais}`,
          value: `l02`
        },
        {
          label: `linha03-${codigoPais}`,
          value: `l03`
        },
        {
          label: `linha04-${codigoPais}`,
          value: `l04`
        }
      ])
    }, 2000));
  }

  static async getFeriados(codigoAgencia: string): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => {
      resolve([new Date()]);
    }, 2000));
  }
}
