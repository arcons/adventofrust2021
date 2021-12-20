use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {

    let contents = load_from_file("./inputs/test.txt");
    // let part_1_answer =  part1(contents);
    // println!("Part 1 {}", part_1_answer);
    let part_2_answer =  part2(contents);
    println!("Part 2 {}", part_2_answer);
}

fn part1(input: Vec<Vec<char>>) -> i32 {
  let mut gamma: Vec<char> = vec![];
  let mut epsilon: Vec<char> = vec![];
  // let all_bin = input.len();
  for y in 0..input[0].len() {
    let mut zero_count = 0;
    let mut one_count = 0;

    for x in 0..input.len() {
      let current = input[x][y];
      if current == '0' {
        zero_count+=1;
      }
      else if current == '1' {
        one_count+=1;
      }
    }
    if zero_count > one_count {
      gamma.push('0');
      epsilon.push('1');
    } else {
      gamma.push('1');
      epsilon.push('0');
    }

  }
  let g: String = gamma.into_iter().collect();
  let e: String = epsilon.into_iter().collect();
  println!("gamma {}", g);
  println!("epsil {}", e);
  let gamma_val = isize::from_str_radix(&g, 2).unwrap();
  let epsilon_val = isize::from_str_radix(&e, 2).unwrap();
  println!("gamma val {}", gamma_val);
  println!("epsil val {}", epsilon_val);
  return (gamma_val * epsilon_val).try_into().unwrap()
  // return -1
}



fn part2(input: Vec<Vec<char>>) -> i32 {
  let mut oxygen: Vec<Vec<char>> = input.clone();
  let mut carbon: Vec<Vec<char>> = input.clone();

  // let all_bin = input.len();
  // keep = input[y].clone()
  // while oxygen.len() != 1 {
    let mut ox_index: Vec<i32> = vec![];
    let mut ca_index: Vec<i32> = vec![];
    
    //
    for y in 0..oxygen.len() {
      
      let mut zero_count = 0;
      let mut one_count = 0;

      for x in 0..input.len() {
        let current = input[x][y];
        let current_row = input[y].clone();
        if current == '0' {
          zero_count+=1;
          ca_index.push(x.try_into().unwrap());
        }
        else if current == '1' {
          one_count+=1;
          ox_index.push(x.try_into().unwrap());
        }
      }
      println!("ox_index val {:?}", ox_index);
      println!("ca_index val {:?}", ca_index);

      // println!("input at 0,5 {:?}", input[0]);
      let mut new_ox: Vec<Vec<[char]>> = vec![];
      if zero_count >= one_count {
        for index in ox_index {
          println!("cloned_val val {:?}", input[index]);
          // let cloned_val = input[index].clone()
          // println!("cloned_val val {:?}", cloned_val);
          // new_ox.push(input[index])
        }
      } 
      else {
        for index in ca_index {
          println!("cloned_val val {:?}", input[index]);
          // let cloned_val = input[index].clone()
          // println!("cloned_val val {:?}", cloned_val);
          // new_ox.push(input[index])
        }
      }
      // oxygen = ca_index.clone();
      // println!("ca_index val {:?}", oxygen);

    }
  // }

  // while carbon.len() != 1 {
  //   let mut oxIndex: Vec<Vec<char>> = vec![];
  //   let mut caIndex: Vec<Vec<char>> = vec![];
    
  //   //
  //   for y in 0..input[0].len() {
      
  //     let mut zero_count = 0;
  //     let mut one_count = 0;

  //     for x in 0..input.len() {
  //       let current = input[x][y];
  //       if current == '0' {
  //         zero_count+=1;
  //         oxIndex.push(current)
  //       }
  //       else if current == '1' {
  //         one_count+=1;
  //         caIndex.push(current)
  //       }
  //     }

  //     if one_count < zero_count {
  //       carbon = oxIndex.clone()
  //     } else {
  //       carbon = caIndex.clone()
  //     }
  //   }
  // }

  // let o: String = oxygen[0].into_iter().collect();
  // let c: String = carbon[0].into_iter().collect();
  // println!("oxygen bit {}", o);
  // println!("carbon bit {}", c);
  // let oxygen_val = isize::from_str_radix(&g, 2).unwrap();
  // let carbon_val = isize::from_str_radix(&e, 2).unwrap();
  // println!("oxygen val {}", oxygen_val);
  // println!("carbon val {}", carbon_val);
  // return (oxygen_val * carbon_val).try_into().unwrap()
  return -1
}

fn load_from_file(file_path: &str) -> Vec<Vec<char>> {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();

  let mut commands = Vec::new();
    for line in lines {
      let char_vec: Vec<char> = line.chars().collect();
      commands.push(char_vec)
    }
    return commands;
}