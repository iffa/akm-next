export class ResponseTimesDto {
  validation: number;
  fetching: number;
}

export class BaseResponseDto {
  status: 'success' | 'failed';
  warnings: string[];
  errors: string[];
  info: {
    times: ResponseTimesDto;
    productCount?: number;
  };
}
